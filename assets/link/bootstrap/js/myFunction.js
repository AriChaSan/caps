function view(id, product_name, price, category, imageName, url) 
{

    var strProductName = 'Product Name: ';        
    document.getElementById('modal-product_name').innerHTML = strProductName.bold() +product_name;

    var strPrice = 'Price: ';        
    document.getElementById('modal-price').innerHTML = strPrice.bold() + price;

    var strCategoryn = 'Category: '; 

        if(category == 1)
        {
            category = 'Appetizers';            
        }
        else if(category == 2)
        {
            category = 'Foods';
        }
        else if(category == 3)
        {
            category = 'Drinks';
        }   
        else if(category == 4)
        {
            category = 'Desserts';
        }    

    document.getElementById('modal-category').innerHTML = strCategoryn.bold() + category;

    $("#modal-product_image").attr("src", url +'/admin/view/'+ imageName);

    $('#viewModal').modal('show');
}

function edit(id, product_name, price, category, imageName, accountType, url)
{
    $("div").removeClass("has-error");  
    $("#errorSpan").remove();  
    if(accountType = 1)
    {
        accountType = 'admin';
    }else if(accountType = 1)
    {
        accountType = 'manager';
    }

    $('#edit-product_name').val(product_name);  
    $('#edit-price').val(price); 
    $('#edit-category').val(category);
    $("#modal-edit-form").attr("action", url + '/' + accountType + '/updateproduct/'+ id);
    $("#modal-edit-product_image").attr("src", url +'/admin/view/'+ imageName);
    $('#editModal').modal('show');
}

function editError(imageName)
{ 
    $("#modal-edit-product_image").attr("src", "http://" + window.location.host +'/admin/view/'+ imageName);
    $('#editModal').modal();
}
