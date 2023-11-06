
var debugCrypt=false
	
	//https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
	function dec2bin(dec) {
	  return (dec >>> 0).toString(2);
	}
function createBinaryString (nMask) {
  // nMask must be between -2147483648 and 2147483647
  for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
       nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
  return sMask;
}

function loadPPT(pptx,password) {
        //$("body").append($("<p>decrypting</p>"))

	// https://stackoverflow.com/questions/62578705/decrypt-openssl-aes-256-cbc-in-browser-cryptojs
	cipherb64=pptx.replaceAll("\n","")
	if (debugCrypt) { console.log("A salted cipher U2FsdG="+cipherb64.substring(0,4)) }
	var encrypted = atob(cipherb64)
/*
	console.log("S="+encrypted[0]+"="+encrypted[0].charCodeAt(0)+"="+dec2bin(encrypted[0].charCodeAt(0)))
*/
	encrypted = cipherb64
	var encryptedWA = CryptoJS.enc.Base64.parse(encrypted);
	
	//console.log("S="+String.fromCharCode(Math.floor(encryptedWA.words[0]/(256*256*256)%256)))
	var prefixWA = CryptoJS.lib.WordArray.create(encryptedWA.words.slice(0, 8/4));                             // Salted__ prefix
	//console.log("t="+String.fromCharCode(prefixWA.words[0]%256))
	var saltWA = CryptoJS.lib.WordArray.create(encryptedWA.words.slice(8/4, 16/4));                            // 8 bytes salt: 0x0123456789ABCDEF
	var ciphertextWA = CryptoJS.lib.WordArray.create(encryptedWA.words.slice(16/4, encryptedWA.words.length)); // ciphertext        
	//ciphertextWA.words[0]=0

	// 2. Determine key and IV using PBKDF2
	// saltWA.words[0]=0 salt looks correct
	var keyIvWA = CryptoJS.PBKDF2(
	    password, 
	    saltWA, 
	    {
		keySize: (32+16)/4,          // key and IV - changing breaks
		iterations: 10000, // default openssl - changing this breaks
		hasher: CryptoJS.algo.SHA256 // default openssl - changing breaks
	    }
	);
	var keyWA = CryptoJS.lib.WordArray.create(keyIvWA.words.slice(0, 32/4));
	//keyWA.words[0]=0 //key looks correct
	var ivWA = CryptoJS.lib.WordArray.create(keyIvWA.words.slice(32/4, (32+16)/4));
	// ivWA.words[0]=0 // not sure if iv is correct 
	// TAAgCW0Nvb

	//console.log("3")
	// 3. Decrypt
	var decryptedWA = CryptoJS.AES.decrypt(
	    {ciphertext: ciphertextWA}, 
	    keyWA, 
	    {iv: ivWA, mode: CryptoJS.mode.CBC, formatter:CryptoJS.format.OpenSSL, padding: CryptoJS.pad.Pkcs7}
	);
	//decryptedWA = CryptoJS.AES.decrypt(cipherb64,password)
			//formatter: CryptoJS.format.OpenSSL,
			 //   padding: CryptoJS.pad.Pkcs7
	//var decrypted = decryptedWA.toString(CryptoJS.enc.Base64)
	var decrypted = CryptoJS.enc.Base64.stringify(decryptedWA)
	if (debugCrypt) { console.log(decrypted.substring(0,80)) }

	let ppt=decrypted
	//let ppt=decrypted.toString(CryptoJS.enc.Base64)
	//let ppt=atob(decrypted)
	//let ppt=decryptedWA
	if (debugCrypt) {
	console.log("Our pptx UE="+ppt[0]+ppt[1])
	console.log("TAAgCW0N="+ppt.substring(35,48))
	}
	ppt="data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,"+ppt
	return ppt
}
