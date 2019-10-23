import React, { Component } from 'react';
import './style.scss';
import prev from '../../svg/arrow-left.svg';
import next from '../../svg/arrow-right.svg';


class Pagination extends Component{
    onPrev = () =>{
        if(this.props.currentPage!==1){
            this.props.changeCurrentPage(this.props.currentPage-1);
        }
    }

    onNext = (nPages) =>{
        
        if(this.props.currentPage!==nPages){
            this.props.changeCurrentPage(this.props.currentPage+1);
        }
    }

    getPaginationElements = (nPages, currentPage) =>{
        var paginationElements=[];
        if(nPages<5){
            for(var i=0; i<nPages; i++){
                paginationElements.push(currentPage+i);
            }
        }else if(currentPage <= nPages-3){
            for(var j=0;j<5;j++){
                if(j===3){paginationElements.push('...')}
                else if(j===4){paginationElements.push(nPages)}
                else{paginationElements.push(currentPage+j)}
            }
        }else{
            for(var z=0;z<5;z++){
                if(z===0){paginationElements.push(1)}
                else if(z===1){paginationElements.push('...')}
                else{paginationElements.push(nPages-(2-(z-2)))}
            }
        }
        return paginationElements;
    }
    
    render(){
        const {productPerPage, totalProducts, currentPage, changeCurrentPage} = this.props;
        
        var nPages = (totalProducts % productPerPage === 0) ? 
                      totalProducts / productPerPage :
                      parseInt(totalProducts / productPerPage) +1;
        
        var paginationElements = this.getPaginationElements(nPages, currentPage);

        return(
            <div className="pagination-wrapper">
                <div className="pagination-arrow" onClick={this.onPrev}>
                    <img alt='prev icon' src={prev} /> 
                </div>
                    {paginationElements.map((element,i)=>{
                        if(element===currentPage){
                            return <div key={i+' element'} className="pagination-page current-page">{element}</div>
                        }
                        else if(element==='...'){
                            return <div key={i+' element'} className="pagination-page">{element}</div>
                        }
                        else{
                            return <div key={i+' element'} className="pagination-page" onClick={()=>changeCurrentPage(element)}>{element}</div>
                        }
                    })}
                <div className="pagination-arrow" onClick={()=>{this.onNext(nPages)}}>
                    <img alt='next icon' src={next} />
                </div>
            </div>
        )
    }
}
export default Pagination;