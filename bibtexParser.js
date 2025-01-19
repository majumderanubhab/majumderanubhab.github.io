// bibtexParser.js

function parseBibTeX(bibtexData) {
  const entries = [];
  const regex = /@(\w+)\s*\{([^,]+),([\s\S]*?)\}/g;
  let match;

  while ((match = regex.exec(bibtexData)) !== null) {
    const entryType = match[1];
    const entryId = match[2];
    const entryFields = match[3].trim().split('\n').map(field => field.trim());

    const entry = {
      type: entryType,
      id: entryId,
      author: '',
      title: '',
      year: '',
      booktitle: '',
      journal: '',
      volume: '',
      number: '',
      pages: '',
      publisher: ''
    };

    // Parse individual fields
    entryFields.forEach(field => {
      const [key, value] = field.split('=').map(item => item.trim().replace(/[\{\}]/g, '').trim());
      if (key === 'author') entry.author = value;
      if (key === 'title') entry.title = value;
      if (key === 'year') entry.year = parseInt(value, 10);
      if (key === 'booktitle') entry.booktitle = value;
      if (key === 'journal') entry.journal = value;
      if (key === 'volume') entry.volume = value;
      if (key === 'number') entry.number = value;
      if (key === 'pages') entry.pages = value;
      if (key === 'publisher') entry.publisher = value;
    });

    entries.push(entry);
  }

  return entries;
}
