const path = require('path'); // Add this to the very top of your file
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Middleware (Configuration)
app.use(cors()); // Autorise le frontend à parler au backend
app.use(bodyParser.json()); // Permet de lire le JSON envoyé par le frontend

app.use(express.static(path.join(__dirname, '../Front')));

// 1. Connexion à MongoDB (Remplacez l'URL si vous utilisez MongoDB Atlas)
mongoose.connect('mongodb://mongo:27017/agritechDB')
  .then(() => console.log("Connecté à MongoDB"))
  .catch(err => console.error("Erreur connexion Mongo:", err));

// 2. Création du Modèle Utilisateur (Schéma)
const UserSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    phone: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front/home.html'));
});

// 3. Route INSCRIPTION (Signup)
app.post('/signup', async (req, res) => {
    const { nom, prenom, phone, email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        // Hacher (crypter) le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer le nouvel utilisateur
        const newUser = new User({ 
            nom, prenom, phone, email, 
            password: hashedPassword 
        });

        await newUser.save();
        res.status(201).json({ message: "Compte créé avec succès !" });

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur lors de l'inscription." });
    }
});

// 4. Route CONNEXION (Login)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Chercher l'utilisateur
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Utilisateur non trouvé." });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mot de passe incorrect." });
        }

        // Succès
        res.status(200).json({ message: "Connexion réussie !", user: { nom: user.nom, email: user.email } });

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur." });
    }
});

// 1. Définir le modèle "Produit"
const ProductSchema = new mongoose.Schema({
    category: String,
    title: String,
    description: String,
    price: Number,
    unit: String,
    //address: String,
    image: String, // On va stocker l'image sous forme de longue chaîne de caractères
    date: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', ProductSchema);


// 3. Créer la route pour recevoir l'annonce
app.post('/api/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ message: 'Produit publié avec succès !' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la sauvegarde' });
    }
});

// Route pour récupérer TOUS les produits
app.get('/api/products', async (req, res) => {
    try {
        // .find() sans arguments retourne tout ce qu'il y a dans la collection
        // .sort({ date: -1 }) met les plus récents en premier
        const products = await Product.find().sort({ date: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Impossible de récupérer les produits' });
    }
});

// Route pour récupérer UN SEUL produit par son ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});


// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});