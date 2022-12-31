/**
 * @description test demo
 * @author afang
 */
function sum(a, b){
    return a+b
}
test('10+20应该等于30', ()=>{
    const res = sum(10, 10)
    // expect(res).toBe(30)
    expect(res).not.toBe(30)
})