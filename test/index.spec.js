/* eslint-env mocha */

const fs = require('fs')
const path = require('path')
const assert = require('assert').strict
const showdown = require('showdown')

require('@citation-js/plugin-bibtex')
require('@citation-js/plugin-csl')
require('../src/')(showdown, {
  references: `
@article{shotton_publishing:_2013,
	title = {Publishing: {Open} citations},
	volume = {502},
	issn = {0028-0836, 1476-4687},
	shorttitle = {Publishing},
	url = {http://www.nature.com/doifinder/10.1038/502295a},
	doi = {10.1038/502295a},
	number = {7471},
	urldate = {2019-04-28},
	journal = {Nature},
	author = {Shotton, David},
	month = oct,
	year = {2013},
	pages = {295--297}
}

@article{van_eck_citnetexplorer:_2014,
	title = {{CitNetExplorer}: {A} new software tool for analyzing and visualizing citation networks},
	volume = {8},
	issn = {1751-1577},
	shorttitle = {{CitNetExplorer}},
	url = {http://www.sciencedirect.com/science/article/pii/S1751157714000662},
	doi = {10.1016/j.joi.2014.07.006},
	abstract = {We present CitNetExplorer, a new software tool for analyzing and visualizing citation networks of scientific publications. CitNetExplorer can for instance be used to study the development of a research field, to delineate the literature on a research topic, and to support literature reviewing. We first introduce the main concepts that need to be understood when working with CitNetExplorer. We then demonstrate CitNetExplorer by using the tool to analyze the scientometric literature and the literature on community detection in networks. Finally, we discuss some technical details on the construction, visualization, and analysis of citation networks in CitNetExplorer.},
	number = {4},
	urldate = {2019-07-11},
	journal = {Journal of Informetrics},
	author = {van Eck, Nees Jan and Waltman, Ludo},
	month = oct,
	year = {2014},
	keywords = {Citation network, CitNetExplorer, Computer software, Network analysis, Visualization},
	pages = {802--823},
}

@inproceedings{brase_datacite_2009,
	address = {Beijing, China},
	title = {{DataCite} - {A} {Global} {Registration} {Agency} for {Research} {Data}},
	isbn = {978-0-7695-3898-3},
	url = {http://ieeexplore.ieee.org/document/5361881/},
	doi = {10.1109/COINFO.2009.66},
	urldate = {2019-04-29},
	booktitle = {2009 {Fourth} {International} {Conference} on {Cooperation} and {Promotion} of {Information} {Resources} in {Science} and {Technology}},
	publisher = {IEEE},
	author = {Brase, Jan},
	month = nov,
	year = {2009},
	pages = {257--261}
}

@article{neumann_datacite_2014,
	title = {{DataCite} and {DOI} names for research data},
	volume = {28},
	issn = {0920-654X, 1573-4951},
	url = {http://link.springer.com/10.1007/s10822-014-9776-5},
	doi = {10.1007/s10822-014-9776-5},
	language = {en},
	number = {10},
	urldate = {2019-04-29},
	journal = {Journal of Computer-Aided Molecular Design},
	author = {Neumann, Janna and Brase, Jan},
	month = oct,
	year = {2014},
	pages = {1035--1041}
}

@article{lammey_crossref_2015,
	title = {{CrossRef} text and data mining services},
	volume = {2},
	issn = {2288-8063, 2288-7474},
	url = {http://escienceediting.org/journal/view.php?doi=10.6087/kcse.32},
	doi = {10.6087/kcse.32},
	language = {en},
	number = {1},
	urldate = {2019-04-29},
	journal = {Science Editing},
	author = {Lammey, Rachael},
	month = feb,
	year = {2015},
	pages = {22--27}
}`
})

const converter = new showdown.Converter({ extensions: ['citation.js'] })

const input = fs.readFileSync(path.join(__dirname, '/in.md'), 'utf8')
const output = fs.readFileSync(path.join(__dirname, '/out.html'), 'utf8')

describe('filter', () => {
  it('works', () => {
    const test = converter.makeHtml(input)
    assert.equal(test, output)
  })
})
