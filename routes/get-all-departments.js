exports.getAllDepartments = async (req, res, supabase) => {
    try {
      const { data, error } = await supabase.from('Department').select('*'); 
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching Departments' });
      }
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching Departments' });
    }
  }