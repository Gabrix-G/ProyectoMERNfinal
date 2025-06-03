import faqsModel from "../models/faqs.js";

const faqsController = {};

// SELECT: Obtener todas las FAQs
faqsController.getAllFAQs = async (req, res) => {
    try {
        const faqs = await faqsModel.find();
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las FAQs", error });
    }
};


// INSERT: Crear una nueva FAQ con validaciones
faqsController.createFAQ = async (req, res) => {
    const { pregunta, respuesta } = req.body;

    // Validación de campos vacíos (null, undefined o solo espacios)
    if (!pregunta || !pregunta.trim() || !respuesta || !respuesta.trim()) {
        return res.status(400).json({ message: "Los campos 'pregunta' y 'respuesta' no pueden estar vacíos." });
    }
    if (pregunta.trim().length < 5 || pregunta.trim().length > 300) {
        return res.status(400).json({ message: "La pregunta debe tener entre 5 y 300 caracteres." });
    }
    if (respuesta.trim().length < 5 || respuesta.trim().length > 1000) {
        return res.status(400).json({ message: "La respuesta debe tener entre 5 y 1000 caracteres." });
    }

    const newFAQ = new faqsModel({ pregunta: pregunta.trim(), respuesta: respuesta.trim() });
    try {
        const savedFAQ = await newFAQ.save();
        res.status(201).json(savedFAQ);
    } catch (error) {
        res.status(400).json({ message: "Error al crear la FAQ", error });
    }
};


// UPDATE: Actualizar una FAQ existente
faqsController.updateFAQ = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedFAQ = await faqsModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedFAQ) {
            return res.status(404).json({ message: "FAQ no encontrada" });
        }
        res.status(200).json(updatedFAQ);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar la FAQ", error });
    }
};

// DELETE: Eliminar una FAQ
faqsController.deleteFAQ = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFAQ = await faqsModel.findByIdAndDelete(id);
        if (!deletedFAQ) {
            return res.status(404).json({ message: "FAQ no encontrada" });
        }
        res.status(200).json({ message: "FAQ eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la FAQ", error });
    }
};

export default faqsController;
