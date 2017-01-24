const fs = require('fs');
const readline = require('readline');
const pathUtils = require('path');

// Create scripts dir if it not exists
if (!fs.existsSync('./scripts')){
    fs.mkdirSync('./scripts');
}

// Parse single markdown file to script
const transpileFile = (path) => {
  const outpath = path.replace('/docs/', '/scripts').replace('.md', '');

  if (outpath.match(/\.[a-zA-Z]*$/g)) {
  	const reader = readline.createInterface({
  		input: fs.createReadStream(path)
  	});

  	const writer = fs.createWriteStream(path.replace('/docs/', '/scripts/').replace('.md', ''));

  	writer.on('error', (err) => {
  		console.error('Writer Error (' + path + '):', err);
  	});

  	reader.on('error', (err) => {
  		console.error('Reader Error (' + path + '):', err);
  	});

    let inCodeBlock = false;
    reader.on('line', (line) => {
      if (inCodeBlock) {
        if (line.startsWith('```')) {
          inCodeBlock = false;
        } else {
          writer.write(line + '\n');
        }
      } else if (line.startsWith('```')) {
        inCodeBlock = true;
      }
    })
  }
}

// Iterate over a dir
const dirIter = (path) => {
  fs.readdir(path, (err, files) => {
    files.forEach(file => {
      const pathDocs = pathUtils.join(path, file);
      const pathScripts = pathUtils.join(path, file).replace('/docs/', '/scripts/');
      if (file != '_book' && file != '_layouts') {
        if (fs.lstatSync(pathDocs).isDirectory()) {
          if (!fs.existsSync(pathScripts)) {
            fs.mkdirSync(pathScripts);
          }
          dirIter(pathDocs);
        } else {
          transpileFile(pathDocs);
        }
      }
    });
  })
}

// itereate over all dirs
dirIter(pathUtils.join(__dirname, 'docs'), true);
