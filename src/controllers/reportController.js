const PDFDocument = require('pdfkit');
const marcasModel = require('../models/marcasModel');

const exportMarcasPDF = async (req, res) => {
    try {
        console.log('Iniciando geração do PDF...');
        const marcas = await marcasModel.getMarcas(); // Busca todas as marcas
        console.log('Marcas encontradas:', marcas);

        if (!marcas || marcas.length === 0) {
            console.log('Nenhuma marca encontrada.');
            return res.status(404).json({ error: 'Nenhuma marca encontrada' });
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=marcas.pdf');

        const doc = new PDFDocument();
        doc.pipe(res);

        doc.fontSize(20).text('Relatório de Marcas', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text('Nome | Localização', { underline: true });
        doc.moveDown();

        marcas.forEach(marca => {
            doc.text(`${marca.nome} | ${marca.localizacao}`);
            doc.moveDown();
        });

        doc.end();
        console.log('PDF gerado com sucesso.');
    } catch (error) {
        console.error('Erro ao gerar o PDF:', error); // Log do erro
        res.status(500).json({ error: 'Erro ao gerar o PDF' });
    }
};

module.exports = { exportMarcasPDF };