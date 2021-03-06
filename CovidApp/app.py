from flask import Flask,render_template,jsonify
import pandas as pd
import json
from dateutil import parser
from datetime import datetime
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask_pymongo import PyMongo

import datetime as dt

# from flask_sqlalchemy import SQLAlchemy # db enabled
from sqlalchemy import create_engine

# db enabling the app.py
app = Flask(__name__)

@app.route('/')
def index():
    names=pd.read_csv('static/data/Final_Clean_Data.csv')
      
    countries={
        "country":list(set(list(names['country'].values)))
    }
    return render_template('index.html',countries=countries)

@app.route('/csv/')
def return_csv_final_clean_data():
    names=pd.read_csv('static/data/Final_Clean_Data.csv')
    
    custom_names={

        "country":list(names['country'].values),
        "date":list(names['date'].values),
        "total_vaccinations":[float(x) for x in names['total_vaccinations'].values],
        "people_vaccinated":[float(x) for x in names['people_vaccinated'].values],
        "people_fully_vaccinated":[float(x) for x in names['people_fully_vaccinated'].values],
        "daily_vaccinations":[float(x) for x in names['daily_vaccinations'].values],
        "cumulative_total_cases":[float(x) for x in names['cumulative_total_cases'].values],
        "daily_new_cases":[float(x) for x in names['daily_new_cases'].values],
        "active_cases":[float(x) for x in names['active_cases'].values],
        "cumulative_total_deaths":[float(x) for x in names['cumulative_total_deaths'].values],
        "daily_new_deaths":[float(x) for x in names['daily_new_deaths'].values]
        
    }
    return jsonify(custom_names)

@app.route('/countries/')
def countries():
    names=pd.read_csv('static/data/Final_Clean_Data.csv')
      
    countries={
        "country":list(set(list(names['country'].values)))
    }
    return jsonify(countries)



raw_file=pd.read_csv('./static/data/Final_Clean_Data.csv')
 
if __name__ == "__main__":
    app.run(debug=True)