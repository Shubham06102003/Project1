import mediapipe as mp
import cv2

mp_pose = mp.solutions.pose

class PostureDetection:
    def __init__(self):
        self.pose_detector = mp_pose.Pose()

    def analyze(self, image):
        results = self.pose_detector.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
        if results.pose_landmarks:
            return {"posture": "good"}
        return {"posture": "poor"}
