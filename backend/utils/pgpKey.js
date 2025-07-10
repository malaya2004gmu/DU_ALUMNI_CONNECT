const openpgp = require("openpgp");

const pgpKeyGenerate = async (name, email) => {
  const { privateKey, publicKey } = await openpgp.generateKey({
    type: "rsa",
    rsaBits: 2048,
    userIDs: [{ name, email }],
    format: "armored",
  });

  return { privateKey, publicKey };
};

module.exports = pgpKeyGenerate;
