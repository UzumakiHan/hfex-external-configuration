const {program} = require('commander');
const axios = require('axios');
const fs = require('fs');
const prettier  = require('prettier')

program.description('Provide standalone process help for mfex-build');

/**
 * 更新内部所需数据
 */
program
    .option('-u, --update')
    .parse(process.argv);

const options = program.opts();

async function updateProgram() {
    if (options.update) {
        try {
            const res = await axios.get('https://live.bitleo.cn/api/packages/list')
            if (res.data.code === 0) {
                const data = await prettier.format(JSON.stringify(res.data.data.list), {parser: 'typescript', tabWidth: 4, singleQuote: true})
                fs.writeFileSync('src/index.ts', `export default ${data}`)
            }
        } catch (e) {
            console.info('获取依赖标准信息数据失败: ' + e)
        }
    }
}

updateProgram();
