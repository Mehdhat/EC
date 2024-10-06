from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/cart')
def cart():
    return render_template('cart.html')

@app.route('/checkout')
def checkout():
    return render_template('checkout.html')

@app.route('/categories')
def categories():
    return render_template('categories.html')

@app.route('/search')
def search():
    return render_template('search.html')

@app.route('/bag')
def bag():
    return render_template('bag.html')

@app.route('/fragrances')
def fragrances():
    return render_template('fragnances.html')

@app.route('/watches')
def watches():
    return render_template('watches.html')

@app.route('/shoes')
def shoes():
    return render_template('shoes.html')

@app.route('/jewelry')
def jewelry():
    return render_template('jewelry.html')

@app.route('/dress')
def dress():
    return render_template('dress.html')

if __name__ == '__main__':
    app.run(debug=True)
