//generera query

var propidArray = [127, 133, 134, 154, 163, 924];
var propIdComponent = [127, 133, 134, 154, 163, 924];

var query = 'SELECT a.pid, a.artno, a.name_se, a.type_se, a.name_se_chilli, a.type_se_chilli, a.manufacturers_id,';

for (var i = 0; i < propidArray.length; i++){
    query += "<br>(SELECT <br>GROUP_CONCAT(properties_option.name_se SEPARATOR '|') AS property_option_name_se FROM af_object_to_option AS object_to_option <br>INNER JOIN af_properties_option AS properties_option ON properties_option.id = object_to_option.option_id <br>LEFT JOIN af_object_option_value AS object_option_value ON object_to_option.id = object_option_value.object_option_id <br>LEFT JOIN af_properties AS properties ON properties.id = properties_option.property_id <br>LEFT JOIN af_property_value_types AS properties_value_type ON properties_value_type.id = properties.property_value_type_id <br>INNER JOIN af_products AS products ON products.pid = object_to_option.object_id <br>LEFT JOIN af_product_to_propertyset AS products_to_propertySet ON products.pid = products_to_propertySet.product_id <br>LEFT JOIN af_properties_set_to_property AS propertySet_to_property <br>ON propertySet_to_property.properties_set_id = products_to_propertySet.propertyset_id AND propertySet_to_property.property_id = properties.id <br>WHERE products.pid = a.pid AND properties.id = " + propidArray[i] + " ORDER BY properties.sort ASC) as '" + propidArray[i] + "-',";
}

query += '<br>a.disable_se, a.image_exist, b.quantity, c.pid, c.artno, c.name_se, c.type_se, c.name_se_chilli, c.type_se_chilli,';

for (var i = 0; i < propIdComponent.length; i++){
    query += "<br>(SELECT <br>GROUP_CONCAT(properties_option.name_se SEPARATOR '|') AS property_option_name_se FROM af_object_to_option AS object_to_option <br>INNER JOIN af_properties_option AS properties_option ON properties_option.id = object_to_option.option_id <br>LEFT JOIN af_object_option_value AS object_option_value ON object_to_option.id = object_option_value.object_option_id <br>LEFT JOIN af_properties AS properties ON properties.id = properties_option.property_id <br>LEFT JOIN af_property_value_types AS properties_value_type ON properties_value_type.id = properties.property_value_type_id <br>INNER JOIN af_products AS products ON products.pid = object_to_option.object_id <br>LEFT JOIN af_product_to_propertyset AS products_to_propertySet ON products.pid = products_to_propertySet.product_id <br>LEFT JOIN af_properties_set_to_property AS propertySet_to_property <br>ON propertySet_to_property.properties_set_id = products_to_propertySet.propertyset_id AND propertySet_to_property.property_id = properties.id <br>WHERE products.pid = c.pid AND properties.id = " + propIdComponent[i] + " ORDER BY properties.sort ASC) as '" + propIdComponent[i] + "-',";
}

query += 'c.disable_se, c.image_exist<br>'
query += 'FROM af_products a<br>';
query += 'LEFT JOIN af_product_components b ON b.product_id=a.pid AND b.`disable`=0<br>';
query += 'LEFT JOIN af_products c ON c.pid=b.product_component_id AND b.`disable`=0<br>';
query += 'WHERE a.is_package_article=1 AND a.pid IN ()<br>';
query += 'ORDER BY a.pid ASC, b.quantity ASC<br>';
document.write(query);