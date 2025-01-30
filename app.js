function generatePasswords() {
    const length = parseInt(document.getElementById('length').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    const noSimilar = document.getElementById('noSimilar').checked;
    const noDuplicate = document.getElementById('noDuplicate').checked;
    const noSequential = document.getElementById('noSequential').checked;

    const numbers = '0123456789';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const symbols = '!@#$%^&*()_+{}|:<>?-=[];,.';
    const similarChars = 'il1Lo0O';

    let chars = '';

    if (includeNumbers) chars += numbers;
    if (includeLowercase) chars += lowercase;
    if (includeUppercase) chars += uppercase;
    if (includeSymbols) chars += symbols;

    if (noSimilar) {
        chars = chars.split('').filter(char => !similarChars.includes(char)).join('');
    }

    const passwords = [];

    for (let i = 0; i < quantity; i++) {
        let password = '';
        let usedChars = new Set();

        while (password.length < length) {
            const char = chars.charAt(Math.floor(Math.random() * chars.length));

            if (noDuplicate && usedChars.has(char)) {
                continue;
            }

            if (noSequential && password.length > 0 && Math.abs(password.charCodeAt(password.length - 1) - char.charCodeAt(0)) === 1) {
                continue;
            }

            password += char;
            usedChars.add(char);
        }

        passwords.push(password);
    }

    document.getElementById('output').innerHTML = passwords.map(p => `<p>${p}</p>`).join('');
}