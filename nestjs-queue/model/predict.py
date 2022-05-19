
from distutils.log import debug
from tabnanny import verbose
import tensorflow as tf
import tensorflow.keras as keras
import matplotlib.pyplot as plt
# import pandas as pd
import os
# import random
# import shutil
# import pathlib
import sys

from keras_preprocessing.image import load_img, img_to_array, ImageDataGenerator
from keras.applications.vgg16 import preprocess_input

# input image size 150x150
# os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

def load_and_predict(modelh5Path, testingDirPath):
    model = keras.models.load_model(modelh5Path)
    test_generator = ImageDataGenerator(rescale=1. / 255)

    test_iterator = test_generator.flow_from_directory(
        testingDirPath,
        target_size=(150, 150),
        shuffle=False,
        class_mode='binary',
        batch_size=1)


    predict_result = model.predict(test_iterator, steps=len(test_iterator.filenames), verbose=False)
    predictions = []
    for index, prediction in enumerate(predict_result):
        predictions.append([index, prediction[0]])
    predictions.sort()
    return predictions

if __name__ == '__main__':
    try:
        modelh5Path = sys.argv[1]
        testingDirPath = sys.argv[2]
        # get file path from arg and call
        predictions = load_and_predict(modelh5Path, testingDirPath)
        print(predictions)
    except Exception as e: 
        print(e)    
    