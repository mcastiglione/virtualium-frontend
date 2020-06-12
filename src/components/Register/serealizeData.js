const serealizeData = (data, update) => {
	let formData = new FormData();

	if(update){
		for(const input in data) {
			switch (input) {
				case 'acepta_noticias':
				case 'email_confirmado':
					break;
				case 'fecha_nacimiento':
					if (data.nacAnho || data.nacMes || data.nacDia) {
						formData.append(input, `${data.nacAnho}-${data.nacMes}-${data.nacDia}`);
					}
					break;
				default:
					if(data[input]) {
						formData.append(input, data[input]);
					}
			}
		}
	} else {
		for(const input in data) {
			switch (input) {
				case 'email_confirmado':
					break;
				case 'fecha_nacimiento':
					if (data.nacAnho || data.nacMes || data.nacDia) {
						formData.append(input, `${data.nacAnho}-${data.nacMes}-${data.nacDia}`);
					}
					break;
				default:
					formData.append(input, data[input]);
			}
		}
	}

	return formData;
}

export default serealizeData;