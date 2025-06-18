const Client = require('../models/Client');

module.exports = {
    newClient: (req, res) => {
        res.render('clients/newClient', { title: 'New Client'});
    },
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
            res.redirect('/clients/new-client');
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
    },
    getClient: async (req, res) => {
        try {
            const client = await Client.findById(req.params.id);
            if (!client) {
                req.flaash('error', "Client not found.");
                return res.redirect('/clients');
            }
            res.render('clients/showClient', { 
                title: client.fullName,
                client
             });
        } catch (err) {
            console.error('Error fetching client:', err);
            req.flash('error', "Could not load client.");
            res.redirect('/clients');
        }
    },
    editClient: async (req, res) => {
        try {
            const client = await Client.findById(req.params.id);
            if (!client) {
                req.flash('error', "Client not found.");
                return res.redirect('/clients');
            }
            res.render('clients/editClient', { 
                title: `Edit ${client.fullName}`,
                client
            });
        } catch (err) {
            console.error('Error fetching client for edit:', err);
            req.flash('error', "Could not edit client.");
            res.redirect('/clients');
        }
    },
    updateClient: async (req, res) => {
        try {
            const {  fullName, contactEmail, contactNumber, physicalAddress } = req.body;
            await Client.findByIdAndUpdate(req.params.id, {
                fullName,
                contactEmail,
                contactNumber,
                physicalAddress
            });
            req.flash('success', "Client updated successfully.");
            res.redirect(`/clients/${req.params.id}`);
        } catch (err) {
            console.error('Error updating client:', err);
            req.flash('error', "Could not update client.");
            res.redirect(`/clients/${req.params.id}/edit`);
        }
    },
    deleteClient: async (req, res) => {
        try {
            await Client.findByIdAndDelete(req.params.id);
            req.flash('success', "Client deleted successfully.");
            res.redirect('/clients');
        } catch (err) {
            console.error('Error deleting client:', err);
            req.flash('error', "Could not delete client.");
            res.redirect('/clients');
        }
    }
};
