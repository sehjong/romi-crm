const Client = require('../models/Client');

module.exports = {
    createClient: async (req, res) => {
        try {
            const client = new Client({
                fullName: req.body.fullName,
                contactEmail: req.body.contactEmail,
                contactNumber: req.body.contactNumber,
                physicalAddress: req.body.physicalAddress
            });
            await client.save();
            res.redirect('/clients');
        } catch (err) {
            console.error('Error creating client:', err);
            req.flash('error', "Failed to create client. Please try again.");
            res.redirect('/clients/new');
        }
    },
    getClients: async (req, res) => {
        try {
            const clients = await Client.find().sort({ registrationDate: -1 });
            res.render('clients/index', { clients });
        } catch (err) {
            console.error('Error fetching clients:', err);
            req.flash('error', "Could not load clients.");
            res.redirect('/');
        }
    }
};
