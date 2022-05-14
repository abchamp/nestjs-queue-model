
import tensorflow as tf
import tensorflow.keras as keras
import matplotlib.pyplot as plt
import pandas as pd

import os
import random
import shutil
import pathlib

from keras_preprocessing.image import load_img, img_to_array, ImageDataGenerator
from keras.applications.vgg16 import preprocess_input

# input image size 150x150


def load_and_predict():
    testImage = load_img(f"./input_test/all_classes/1.jpg", target_size=(150, 150))
    # model = keras.models.load_model('dogs-vs-cats.h5')
    model = keras.models.load_model('dogs-vs-cats.h5')

    #preprocess the image
    testImage = img_to_array(testImage)
    testImage = testImage.reshape((1, testImage.shape[0], testImage.shape[1], testImage.shape[2]))
    # testImage = preprocess_input(testImage)
    # testImage = testImage.reshape((1, testImage.shape[0], testImage.shape[1], testImage.shape[2]))

    # test_generator = ImageDataGenerator(rescale=1. / 255)

    # test_iterator = test_generator.flow_from_directory(
    #     './input_test',
    #     target_size=(150, 150),
    #     shuffle=False,
    #     class_mode='binary',
    #     batch_size=1)

    # ids = []
    # for filename in test_iterator.filenames:
    #     ids.append(int(filename.split('\\')[1].split('.')[0]))

    predict_result = model.predict(testImage)
    predictions = []
    # for index, prediction in enumerate(predict_result):
    #     predictions.append([ids[index], prediction[0]])
    # predictions.sort()

    return predict_result

if __name__ == '__main__':
    try:
        # get file path from arg and call
        predictions = load_and_predict()
        print(predictions)
    except Exception as e: 
        print(e)    
    