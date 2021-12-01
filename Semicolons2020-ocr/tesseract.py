import pytesseract
import argparse
import cv2

file_name = "report.png"

image = cv2.imread(file_name)
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

text = pytesseract.image_to_string(file_name )
print (text)