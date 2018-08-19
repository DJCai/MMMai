#=require ./index

#BASIC TESTS
describe "Options", ->

  form1 = null
  form2 = null
  html = """
    <div data-demo>
      <form id="form1"></form>
      <form id="form2"></form>
    </div>
  """

  beforeEach ->
    $('#fixtures').html html
    form1 = $("#form1")
    form2 = $("#form2")

  describe "Options - Inheritance", ->

    beforeEach ->
      form1.verify
        errorClass: "warning"

      form2.verify()

      $.verify
        errorClass: "invalid"

    it "should have custom option set", ->
      expect(form1.data('verify').options.errorClass).to.equal "warning"

    it "should have global option set", ->
      expect(form2.data('verify').options.errorClass).to.equal "invalid"
