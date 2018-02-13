import moxios from 'moxios'

import WordpressClient from '../../src/clients/WordpressClient'

beforeEach( () => moxios.install())

afterEach(() => moxios.uninstall())

const client = new WordpressClient()

test('return list of categories', () => {
    let expectedCategories = [
        {
            id: 1,
            name: 'category1',
            acf: {
                image: {
                    url: 'http://url1'
                }
            }
        },
        {
            id: 2,
            name: 'category2',
            acf: {
                image: {
                    url: 'http://url2'
                }
            }
        }
    ]

    let url = `http://abacaxi-p3-api.herokuapp.com/index.php/wp-json/wp/v2/categories`

    moxios.stubRequest(url, {
        status: 200,
        response: expectedCategories
    })

    let spy = jest.spyOn(client, 'getCategories')
    let categories = client.getCategories()

    moxios.wait(() => {
        expect(spy.toHaveBeenCalled())
        expect(categories).to.deep.equal(expectedCategories)

        done()
    })
})
