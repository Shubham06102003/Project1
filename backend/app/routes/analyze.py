from flask import Blueprint, request, jsonify
from models.facial_detection import FacialDetection
from models.posture_detection import PostureDetection
from utils.frame_processing import decode_image

analyze = Blueprint("analyze", __name__)

# Initialize detection models
face_detector = FacialDetection()
posture_detector = PostureDetection()

@analyze.route("/analyze", methods=["POST"])
def analyze_frame():
    if "frame" not in request.files:
        return jsonify({"error": "No frame provided"}), 400
    frame = decode_image(request.files["frame"])

    # Perform analysis
    face_result = face_detector.analyze(frame)
    posture_result = posture_detector.analyze(frame)

    return jsonify({"face": face_result, "posture": posture_result})
