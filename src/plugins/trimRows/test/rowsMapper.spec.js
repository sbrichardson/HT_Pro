describe('TrimRows -> RowsMapper', function() {
  it('should set trimRows plugin while constructing', function() {
    var trimRowsMock = {};
    var mapper = new Handsontable.utils.TrimRowsRowsMapper(trimRowsMock);

    expect(mapper.trimRows).toBe(trimRowsMock);
  });

  it('should be mixed with arrayMapper object', function() {
    expect(Handsontable.utils.TrimRowsRowsMapper.MIXINS).toEqual(['arrayMapper']);
  });

  it('should destroy array after calling destroy method', function() {
    var mapper = new Handsontable.utils.TrimRowsRowsMapper();

    expect(mapper._arrayMap).toEqual([]);

    mapper.destroy();

    expect(mapper._arrayMap).toBe(null);;
  });

  it('should call isTrimmed method "length" times', function() {
    var trimRowsMock = {
      isTrimmed: function(index) {
        return false;
      }
    };
    var mapper = new Handsontable.utils.TrimRowsRowsMapper(trimRowsMock);

    spyOn(trimRowsMock, 'isTrimmed').andCallThrough();
    mapper.createMap(5);

    expect(trimRowsMock.isTrimmed.calls.length).toBe(5);
    expect(trimRowsMock.isTrimmed.calls[0].args).toEqual([0]);
    expect(trimRowsMock.isTrimmed.calls[1].args).toEqual([1]);
    expect(trimRowsMock.isTrimmed.calls[2].args).toEqual([2]);
    expect(trimRowsMock.isTrimmed.calls[3].args).toEqual([3]);
    expect(trimRowsMock.isTrimmed.calls[4].args).toEqual([4]);
  });

  it('should create map with pairs index->value', function() {
    var trimRowsMock = {
      isTrimmed: function(index) {
        return false;
      }
    };
    var mapper = new Handsontable.utils.TrimRowsRowsMapper(trimRowsMock);

    spyOn(trimRowsMock, 'isTrimmed').andCallThrough();
    mapper.createMap(6);

    expect(mapper._arrayMap[0]).toBe(0);
    expect(mapper._arrayMap[1]).toBe(1);
    expect(mapper._arrayMap[2]).toBe(2);
    expect(mapper._arrayMap[3]).toBe(3);
    expect(mapper._arrayMap[4]).toBe(4);
    expect(mapper._arrayMap[5]).toBe(5);
  });

  it('should create map with pairs index->value with some gaps', function() {
    var trimRowsMock = {
      isTrimmed: function(index) {
        return index === 2 || index === 5 ? true : false;
      }
    };
    var mapper = new Handsontable.utils.TrimRowsRowsMapper(trimRowsMock);

    spyOn(trimRowsMock, 'isTrimmed').andCallThrough();
    mapper.createMap(6);

    expect(mapper._arrayMap[0]).toBe(0);
    expect(mapper._arrayMap[1]).toBe(1);
    expect(mapper._arrayMap[2]).toBe(3);
    expect(mapper._arrayMap[3]).toBe(4);
    expect(mapper._arrayMap[4]).toBeUndefined();
    expect(mapper._arrayMap[5]).toBeUndefined();
  });
});