module.exports = (out) ->
	out = out || {};
	for i in [0...arguments.length]
		if !arguments[i]
		    continue;

		for key in arguments[i]
		    if arguments[i].hasOwnProperty(key)
		    	out[key] = arguments[i][key];
	return out
