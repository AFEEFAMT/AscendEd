from flask import Flask, render_template, request, jsonify
import fitz  # PyMuPDF
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_pdf():
    file = request.files['pdf']
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    text = ''
    doc = fitz.open(filepath)
    for page in doc:
        text += page.get_text()

    return jsonify({'text': text})

if __name__ == '__main__':
    app.run(debug=True)
