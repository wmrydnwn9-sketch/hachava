const { json } = require('./lib/env');
const { select } = require('./lib/supabase');
module.exports = async (req, res) => {
  try {
    const categories = await select('product_categories', 'id,slug,name_he,image_url,sort_order,products(id,name_he,description_he,image_url,is_active,sort_order)', '&is_active=eq.true&order=sort_order.asc');
    categories.forEach(c => c.products = (c.products || []).filter(p => p.is_active).sort((a,b)=>(a.sort_order||0)-(b.sort_order||0)));
    json(res, 200, { categories });
  } catch (err) {
    json(res, 500, { error: err.message });
  }
};
