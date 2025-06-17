const Client = require('../models/Client');
const Sale = require('../models/Sale');
const Interaction = require('../models/Interaction');

exports.getDashboard = async (req, res) => {
    try {
        // Fetching various statistics for the dashboard
        
        // Count total clients
        const totalClients = await Client.countDocuments();
        
        // Count open sales (not closed won or lost)
        const openSalesCount = await Sale.countDocuments({ 
            stage: { $nin: ['Closed Won', 'Closed Lost'] } 
        });

        // Calculate total sales value for open sales
        const openSalesValue = await Sale.aggregate([ 
            { $match: { stage: { $nin: ['Closed Won', 'Closed Lost'] } } }, 
            { $group: { _id: null, totalSalesValue: { $sum: '$amount' } } } 
        ]);

        // If no open sales, default to 0
        const totalSalesValue = openSalesValue[0]?.totalSalesValue || 0;

        // Upcoming Follow-Ups (next 7 days)
        const today = new Date();
        const oneWeek = new Date(today);
        oneWeek.setDate(today.getDate() + 7);

        const upcomingFollowUpsCount = await Interaction.countDocuments({ 
            date: { $gte: today, $lte: oneWeek } 
        });

        // Sales by Stage
        const salesStageCount = await Sale.aggregate([ 
            { $group: { _id: '$stage', count: { $sum: 1 } } } 
        ]);
        const salesByStage = salesStageCount.reduce((acc, stage) => {
            acc[stage._id] = stage.count;
            return acc;
        }, {});

        // Next 5 upcoming interactions
        const upcomingInteractions = await Interaction
            .find({ date: { $gte: today } })
            .sort({ date: 1 })
            .limit(5)
            .populate('client', 'fullName');

        // Recent Sales and Interactions for Activity Feed   
        const [recentSales, recentInteractions] = await Promise.all([
            Sale.find()
                .sort({ updatedAt: -1 })
                .limit(5)
                .populate('client', 'fullName'),
            Interaction.find()
                .sort({ updatedAt: -1 })
                .limit(5)
                .populate('client', 'fullName')
        ]);

        const salesActivity = recentSales.map(sale => ({
            message: `Sale for ${sale.client.fullName}: $${sale.amount.toLocaleString()} (${sale.stage})`,
            when: sale.updatedAt
        }));

        const interactionActivity = recentInteractions.map(interaction => ({
            message: `Interaction (${interaction.type}) with ${interaction.client.fullName}: ${interaction.notes.substring(0,30)}…`,
            when: interaction.updatedAt
        }));

        // Merge, sort, and limit to top 5
        const recentActivity = [...salesActivity, ...interactionActivity]
            .sort((a, b) => b.when - a.when)
            .slice(0, 5);

        res.render('dashboard', {
            totalClients,
            openSalesCount,
            totalSalesValue,
            upcomingFollowUpsCount,
            salesByStage,
            upcomingInteractions,
            recentActivity
        });

    } catch (err) {
        console.error(err);
        req.flash("error","Could not load dashboard");
        res.redirect('/');
    }
};