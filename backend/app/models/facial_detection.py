import mediapipe as mp
import cv2

mp_face = mp.solutions.face_detection

class FacialDetection:
    def __init__(self):
        self.face_detector = mp_face.FaceDetection()

    def analyze(self, image):
        results = self.face_detector.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
        if results.detections:
            return {"expression": "neutral", "confidence": results.detections[0].score[0]}
        return {"expression": "none", "confidence": 0}
