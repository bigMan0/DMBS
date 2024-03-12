exports.getPatientRecords = async (req, res, supabase) => {
    try {
      const healthCardId = req.params.health_card; // Get the health_card parameter from the request
      const { data, error } = await supabase
        .from('Records')
        .select('*')
        .filter('health_card', 'eq', healthCardId); // Use the health_card parameter in the query
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching Records' });
      }
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching Records' });
    }
  };