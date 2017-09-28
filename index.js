//generera query

var propidArray = [163, 133, 134];

var query = 'SELECT pid, artno, name_se, type_se, manufacturers_id,';

for (var i = 0; i < propidArray.length; i++){
    query += "\n(SELECT \nGROUP_CONCAT(properties_option.name_se SEPARATOR '|') AS property_option_name_se FROM af_object_to_option AS object_to_option \nINNER JOIN af_properties_option AS properties_option ON properties_option.id = object_to_option.option_id \nLEFT JOIN af_object_option_value AS object_option_value ON object_to_option.id = object_option_value.object_option_id \nLEFT JOIN af_properties AS properties ON properties.id = properties_option.property_id \nLEFT JOIN af_property_value_types AS properties_value_type ON properties_value_type.id = properties.property_value_type_id \nINNER JOIN af_products AS products ON products.pid = object_to_option.object_id \nLEFT JOIN af_product_to_propertyset AS products_to_propertySet ON products.pid = products_to_propertySet.product_id \nLEFT JOIN af_properties_set_to_property AS propertySet_to_property \nON propertySet_to_property.properties_set_id = products_to_propertySet.propertyset_id AND propertySet_to_property.property_id = properties.id \nWHERE products.pid = a.pid AND properties.id = " + propidArray[i] + " ORDER BY properties.sort ASC) as '" + propidArray[i] + "-',";
}

query += ' disable_se \nFROM af_products a WHERE is_package_article=1 AND pid IN ()';

console.log(query);