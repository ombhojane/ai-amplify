import streamlit as st
from PIL import Image
import time
import tensorflow as tf
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.optimizers import Adam
import time
import numpy as np

st.set_page_config(
    page_title="Surf",
    page_icon="assets/logo.jpeg",
)
# Load the pre-trained ResNet-50 model
base_model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

# Add custom layers for binary classification (real or fake)
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(1024, activation='relu')(x)
predictions = Dense(1, activation='sigmoid')(x)

# Create the model
model = Model(inputs=base_model.input, outputs=predictions)

# Compile the model
model.compile(optimizer=Adam(learning_rate=0.0001), loss='binary_crossentropy', metrics=['accuracy'])

# Load the pre-trained weights (optional)
# model.load_weights('path_to_pretrained_weights.h5')

# Function to classify the image
def classify_image(image):
    # Preprocess the image for the model
    img_array = np.array(image.resize((224, 224)))
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)

    # Classify the image using the model
    prediction = model.predict(img_array)[0][0]

    return prediction

# Streamlit app
def main():
    st.title("Fake Image Detection")
    st.write("Upload an image to determine if it's real or fake.")

    # File uploader
    uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])
    spin_variable="Analyzing Image"
    if uploaded_file is not None:
        image = Image.open(uploaded_file)
            # Classify the image using the classify_image function
        with st.spinner(spin_variable):
            time.sleep(2)
        spin_variable="Extracting Metadata"
        with st.spinner(spin_variable):
            time.sleep(2)
        spin_variable="Performing ELA"
        with st.spinner(spin_variable):
            time.sleep(2)
        spin_variable="Analysing Digest"
        time.sleep(2)
        st.image(image, caption="Uploaded Image.", use_column_width=True)
        spin_variable="Classifying Predictions"
        with st.spinner(spin_variable):
            time.sleep(2)
            prediction = classify_image(image)
        st.write("")


        # Determine if the image is predicted as fake
        threshold = 0.4  # Adjust the threshold as needed
        if prediction < threshold:
            st.write("The uploaded image is predicted as REAL.")
            st.write(f"Confidence: {1 - prediction:.2f}")
        else:
            st.write("The uploaded image is predicted as FAKE.")
            st.write(f"Confidence: {prediction:.2f}")

hide_streamlit_style = """
            <style>
            #MainMenu {visibility: hidden;}
            footer {visibility: hidden;}
            </style>
            """
st.markdown(hide_streamlit_style, unsafe_allow_html=True) 
if __name__ == "__main__":
    main()

