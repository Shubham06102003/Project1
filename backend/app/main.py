from flask import Flask
from flask_cors import CORS
from routes.analyze import analyze

app = Flask(__name__)

# Enable CORS for frontend (localhost:3000)
CORS(app, origins="http://localhost:3000")

# Register Blueprints
app.register_blueprint(analyze, url_prefix="/api")

@app.route("/")
def home():
    return "AI Mock Interview Backend is running!"

if __name__ == "__main__":
    app.run(debug=True)
