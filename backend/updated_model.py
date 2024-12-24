import tensorflow as tf
from keras.models import load_model

def create_model():
    # Recreate the model structure
    model = tf.keras.Sequential([
        tf.keras.layers.InputLayer(input_shape=(48, 48, 1)),
        tf.keras.layers.Conv2D(filters=32, kernel_size=(3, 3), activation='relu'),
        tf.keras.layers.BatchNormalization(),
        tf.keras.layers.MaxPooling2D(pool_size=(2, 2)),
        tf.keras.layers.Conv2D(filters=64, kernel_size=(3, 3), activation='relu'),
        tf.keras.layers.BatchNormalization(),
        tf.keras.layers.MaxPooling2D(pool_size=(2, 2)),
        tf.keras.layers.Conv2D(filters=128, kernel_size=(3, 3), activation='relu'),
        tf.keras.layers.BatchNormalization(),
        tf.keras.layers.MaxPooling2D(pool_size=(2, 2)),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(units=256, activation='relu'),
        tf.keras.layers.Dropout(rate=0.5),
        tf.keras.layers.Dense(units=7, activation='softmax'),
    ])

    # Compile the model
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    return model

def save_model():
    # Save the updated model structure and weights
    model = create_model()
    model.save('updated_facial_expression_model.keras')
    print("Model saved successfully.")

def load_and_test_model():
    # Load the saved model
    model = load_model('updated_facial_expression_model.keras')
    print("Model loaded successfully.")
    model.summary()

# Uncomment below to save the model initially
# save_model()

# Test loading the model
load_and_test_model()
