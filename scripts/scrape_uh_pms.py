from bs4 import BeautifulSoup
import requests
import json

resp = requests.get("https://www.uhlodge.org/past-masters/")
html = resp.content
soup = BeautifulSoup(html)
figures = soup.findAll("figure")
output = {"masters": []}
with open("../src/data/uh-past-master-list.json", "w") as output_file:
    output_file.writelines(["[\n"])
    for index, figure in enumerate(figures):
        caption_children = [child for child in figure.find("figcaption").children]
        print("index %s" % index)
        print(caption_children)
        name = caption_children[0]
        years = "By Affiliation"
        if "19" in name or "20" in name:
            # eg 'Matthew E. Newberry 2022-2023'
            year_index = name.index("20") or name.index("19")
            years = name[year_index:]
            name = name[0:year_index - 1]
        elif len(caption_children) >= 2:
            years = caption_children[2]
        img_resp = requests.get(figure.find("a").get("href"))
        filename = "%s_%s" % (years.lower().replace(" ", "_"), name.lower().replace(".", "").replace(" ", "_"))
        with open("../src/assets/images/past_masters/%s.jpg" % filename, "wb") as img_file:
            img_file.write(img_resp.content)
        output_file.writelines([
            "    {\n",
            "        \"number\": %s,\n" % str(index + 1 if index < 73 else -1),
            "        \"name\": \"%s\",\n" % name,
            "        \"term\": \"%s\",\n" % years,
            "        \"imgUrl\": \"%s\"\n" % "../../../assets/images/past_masters/%s.jpg" % filename,
            "    }%s\n" % ("," if index != len(figures) - 1 else "")
        ])
    output_file.write("]")