from flask import Flask, render_template, jsonify


app = Flask(__name__)

@app.route("/")
def main():
    return render_template('index.html')


# deve retornar uma lista com todos os registros do banco de dados
@app.route("/get_points")
def get_points():
    # exemplo
    points = [{
        "id": 1,
        "contact": "email.com",
        "message": "Hello",
        "lat": -23,
        "long": -46
    }]
    return jsonify(points)


# função para salvar os dados recebidos
@app.route("/save", methods=["POST"])
def save():
    # receber as seguintes informações e gravar no banco de dados:
    # "contact": String,
    # "message": String,
    # "lat": Number,
    # "long": Number

    # retornar o status da operação
    return "OK"


if __name__ == "__main__":
    app.run(debug=True)