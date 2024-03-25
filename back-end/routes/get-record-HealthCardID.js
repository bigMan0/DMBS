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
    // If data is not empty, return the first record as an object
    if (data && data.length > 0) {
      res.json(data);
    } else {
      res.status(404).json({ message: 'No record found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching Records' });
  }
};