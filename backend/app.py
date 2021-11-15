from flask import Flask, render_template
from flask_restful import Resource, Api
import json

# since we dont have a database, this is the easiest way to access the data
try:
    f = open('data.json',)
    data = json.load(f)
    f.close()
except:
    data = {}

app = Flask(__name__)
api = Api(app)


class UserData(Resource):
    # this is api to get the data
    def get(self, user_id):
        global data
        try:
            user_data = data['users'][user_id]
        except:
            user_data = None
        if user_data:
            return user_data
        return {'Problem': user_id + ' doesnt exit'}


class Hello(Resource):
    def get(self):
        return {'Hello': 'You can add /user1234 as endpoint and start fetching data'}


api.add_resource(Hello, '/')
api.add_resource(UserData, '/<string:user_id>')


if __name__ == '__main__':
    app.run(debug=True)
