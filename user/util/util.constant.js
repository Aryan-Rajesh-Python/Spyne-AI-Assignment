const password_regex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})'
const jwt_secret = "cvnbkwbir"
const elastic_base_url = ''
const spyne_name_search_index_name = 'spyne-user-data';


module.exports = { password_regex, jwt_secret, elastic_base_url, spyne_name_search_index_name }