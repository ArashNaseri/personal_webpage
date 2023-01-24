import json
import io
import os
import uuid
import datetime
# import numpy as np
from flask import Flask, render_template
from selenium import webdriver
# from __future__ import print_function
from flask import Flask, render_template, make_response
from flask import redirect, request, jsonify, url_for
# from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
# from matplotlib.figure import Figure


year = datetime.datetime.now().year

app = Flask(__name__)
# app.secret_key = 's3cr3t'
# app.debug = True
# app._static_folder = os.path.abspath("templates/static/")

options = webdriver.ChromeOptions()
options.add_experimental_option("excludeSwitches",["ignore-certificate-errors"])
options.add_argument('--disable-gpu')
options.add_argument('--headless')
chrome_driver_path = "/Users/arashnaseri/Downloads/Working Directory/python_tutorial_works/myWebsite/chromedriver"

driver = webdriver.Chrome(executable_path=chrome_driver_path, chrome_options=options)
URL = "http://orteil.dashnet.org/experiments/cookie/"
driver.get("https://scholar.google.ca/citations?user=vylaZIkAAAAJ&hl=en")
driver.find_element_by_id("gsc_a_ha").click()
driver.find_elements_by_css_selector("tr td a .gsc_a_at")
titles = driver.find_elements_by_css_selector(".gsc_a_at")
titles = [title.text for title in titles]
publications = driver.find_elements_by_css_selector("div.gs_gray")

authors = [publications[i].text.split(',')
           for i in range(0, len(publications), 2)]
# authors = [authors[i]  for i in range(0,len(authors))]
journals = [publications[i+1].text for i in range(0, len(publications)-1, 2)]
years = driver.find_elements_by_css_selector("span.gs_ibl")
years = [int(years[i].text) for i in range(0, len(years))]
citations = driver.find_elements_by_css_selector(".gsc_a_ac")

citations = [int(citations[i].text) if not len(citations[i].text) == 0
             else 0
             for i in range(0, len(citations))]
dictionary = [{"title": titles[i],
               "authors": authors[i],
               "journal": journals[i],
               "year": years[i],
               "citation": citations[i]} for i in range(0, len(citations))]

with open("static/js/papers.json", "w") as file:
    json.dump(dictionary, file)


@app.route('/', methods=['GET'])
def index():
    title = 'welcome to my world'
    return render_template('index.html',
                           copyright_date=year)






# @app.route('/results/<uuid>', methods=['GET'])
# def results(uuid):
#     title = 'Result'
#     data = get_file_content(uuid)
#     return render_template('layouts/results.html',
#                            title=title,
#                            data=data)

# @app.route('/postmethod', methods = ['POST'])
# def post_javascript_data():
#     jsdata = request.form['canvas_data']
#     unique_id = create_csv(jsdata)
#     params = { 'uuid' : unique_id }
#     return jsonify(params)

# @app.route('/plot/<imgdata>')
# def plot(imgdata):
#     data = [float(i) for i in imgdata.strip('[]').split(',')]
#     data = np.reshape(data, (200, 200))
#     fig = Figure()
#     axis = fig.add_subplot(1, 1, 1)
#     axis.axis('off')
#     axis.imshow(data, interpolation='nearest')
#     canvas = FigureCanvas(fig)
#     output = io.BytesIO()
#     canvas.print_png(output)
#     response = make_response(output.getvalue())
#     response.mimetype = 'image/png'
#     return response

# def create_csv(text):
#     unique_id = str(uuid.uuid4())
#     with open('images/'+unique_id+'.csv', 'a') as file:
#         file.write(text[1:-1]+"\n")
#     return unique_id

# def get_file_content(uuid):
#     with open('images/'+uuid+'.csv', 'r') as file:
#         return file.read()


if __name__ == '__main__':
    app.run(debug=True)