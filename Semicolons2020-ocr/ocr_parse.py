import re
from flask import Flask, render_template, request
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config["DEBUG"] = True

report_dict = {}
filename = 'ocr.txt'
ocr_text = ""

with open(filename) as fh:
    ocr_text = fh.readlines()

flag = 0
for line in ocr_text :
    if 'test name' in line.lower() and 'result' in line.lower():
        flag = 1
        continue
    if flag == 1:
        test = re.split('\|| \[| \]| \|', line.strip())
        report_dict['report'] = test[1]
        report_dict['report_status'] = test[2]
        break

@app.route('/', methods=['GET'])
def home():
    return report_dict


@app.route('/upload')
def upload_file():
   return render_template('upload.html')
    #return "hello world"

@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file_save():
   if request.method == 'POST':
      f = request.files['file']
      f.save(secure_filename(f.filename))
      return 'file uploaded successfully'

app.run()