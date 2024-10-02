const organizadores = [];

let id = 0;

module.exports = class orgController{
    static async createOrganizador(req, res){
        const { nome, senha, email, telefone } = req.body;

        if (!telefone || !email || !senha || !nome) {
            return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
          } else if (isNaN(telefone) || telefone.length !== 11) {
            return res.status(400).json({ error: "telefone inválido. Deve conter exatamente 11 dígitos numéricos" });
          } else if (!email.includes("@")) {
            return res.status(400).json({ error: "Email inválido. Deve conter @" });
          }

        const existingOrg = organizadores.find(Org => Org.email === email);
        if (existingOrg) {
            return res.status(400).json({ error: "email já cadastrado" });
        }

        id++
        const newOrg = { id, telefone, email, senha, nome };
        organizadores.push(newOrg);

        return res.status(201).json({ message: "Organizador criado com sucesso", Org: newOrg });
    }

    static async getAllOrganizadores(req, res) {
        return res.status(200).json({ message: "Obtendo todos os Organizadors", organizadores });
    }

    static async updateOrganizador(req, res) {
        const { id, telefone, email, senha, nome } = req.body;
    
        if (!telefone || !email || !senha || !nome) {
            return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
          } else if (isNaN(telefone) || telefone.length !== 11) {
            return res.status(400).json({ error: "telefone inválido. Deve conter exatamente 11 dígitos numéricos" });
          } else if (!email.includes("@")) {
            return res.status(400).json({ error: "Email inválido. Deve conter @" });
          }
        const orgIndex = organizadores.findIndex(org => org.id === id);
    
        if(orgIndex === -1){
            return res.status(400).json({ error: "Organizador não encontrado" });
        }

        organizadores[orgIndex] = {id, telefone, email, senha, nome}
    
        return res.status(200).json({ message: "Organizador atualizado", org:organizadores[orgIndex] })
    }

    static async deleteOrganizador(req, res) {
        const orgId = req.params.id
     
        const orgIndex = organizadores.findIndex(org => org.id == orgId);
     
        if(orgIndex === -1){
            return res.status(400).json({ error: "Organizador não encontrado" });
        }
     
        organizadores.splice(orgIndex,1);
     
        return res.status(200).json({ message: "Organizador Apagado" })
     
       }
}

