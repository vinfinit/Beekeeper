import sys
import pandas as pd
from sklearn.externals import joblib

csv_path = sys.argv[1]

df = pd.read_csv(csv_path, header=None)
model = joblib.load('../models/ensemble_model.pkl') 
y_ = model.predict(df)

print(y_)