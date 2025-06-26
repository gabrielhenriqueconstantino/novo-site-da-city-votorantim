const bcrypt = require('bcrypt');

const senhaOriginal = '1234'; // sua senha original
const saltRounds = 10;

bcrypt.hash(senhaOriginal, saltRounds, function(err, hash) {
  if (err) {
    console.error('Erro ao gerar hash:', err);
  } else {
    console.log('Hash da senha:', hash);
  }
});
