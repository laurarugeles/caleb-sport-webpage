var category=null;
var fabricante=null;
var page=0;

function Page (pageNr){
   this.page=pageNr;
}

Page.prototype = {
    
	addClickEvent : function (){
		var _this=this;
		$('#page_' + _this.page).click(function(){
			page=_this.page;
			var selectedProducts=filterProducts();
			generateProductsMarkup(selectedProducts);
		});	
	}	
}	


$(document).ready(function(){
	$("#menu-categorias li a").click(function(){
		category=$(this).attr("id");
		generateFilteredContent();
	});
	$("#menu-fabricante li a").click(function(){
		fabricante=$(this).attr("id");
		generateFilteredContent();
	});
	generatePagination(products);
	generateProductsMarkup(products);
});

function generateFilteredContent(){
	page=0;
	var selectedProducts=filterProducts();
	generatePagination(selectedProducts);
	generateProductsMarkup(selectedProducts);
}	

function generatePagination(selectedProducts){
  var len=Math.floor(selectedProducts.length / 20) + 1;
  $('#pagination').empty();
  for (var i=0;i<len;i++){
	 var pageIndexMarkup=generatePaginationMarkup(i);  
     $('#pagination').append(pageIndexMarkup);
	 var page=new Page(i);
	 page.addClickEvent();
	 
  }	  
}



function filterProducts(){
   var selectedProds=[];
   for (var i=0;i<products.length;i++){
      var product=products[i];
	  var catFullfilled=true;
	  if (category!=null){
	     if (product.categoria!=category){
		    catFullfilled=false;
		 }	 
	  }
	  var fabFullfilled=true;
	  if (fabricante!=null){
	     if (product.fabricante!=fabricante){
		    fabFullfilled=false;
		 }	 
	  }
	  if (catFullfilled && fabFullfilled){
	     selectedProds.push(product);
	  }	  
	  
   }
   return selectedProds;   
}

function generateProductsMarkup(products){
    var firstElement=page * 20;
	var lastElement = firstElement + 20;
	$('#products-container').empty();
	lastElement = products.length<lastElement?products.length: lastElement;
	if (products.length>firstElement){
		for (var i=firstElement;i<lastElement;i++){
		   var product=products[i];
		   var content=generateMarkup(product.imagen, product.page);
		   $('#products-container').append(content);
		}	
	}
}	

function generateMarkup (imageName, pageName){
   var markup="<div class='col-sm-3 col-xs-6'> " + 
              "  <div class='grid-product'> " +
              "      <figure> " +
              "        <a href=''> " +
              "          <img src='" + imageName + "' alt=''/> " +
              "        </a> " +
              "        </figure> " +
              "        <a href='" + pageName + "' class='view-product'> " +
              "          <div class='text'>Ver producto</div> " +
              "          <div class='background'></div> " +
              "        </a> " +
              "  </div> " +
              "</div>";
   return markup;
}	

function generatePaginationMarkup(pageNr){
	var label=pageNr + 1;
	var page="<li><a class='active' style='cursor : pointer' id='page_" + pageNr + "'>" + label + "</a></li>";
	return page;
}
