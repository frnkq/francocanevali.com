import {Component} from 'react'

export default class AsciiArt extends Component {

    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
        return (
            <div className="flex justify-around text-left"> 
                <div className="font-[900]">
                    <pre className="p-0 mt-0 text-[0.6em] font-[900]">
                        {
                            `
  ,
  Et                                              :
  E#t                 L.             G:          t#,
  E##t     j.         EW:        ,ft E#,    :   ;##W.
  E#W#t    EW,        E##;       t#E E#t  .GE  :#L:WE
  E#tfL.   E##j       E###t      t#E E#t j#K; .KG  ,#D
  E#t      E###D.     E#fE#f     t#E E#GK#f   EE    ;#f
ffW#Dffj.  E#jG#W;    E#t D#G    t#E E##D.   f#.     t#i
 LW#ELLLf. E#t t##f   E#t  f#E.  t#E E##Wi   :#G   G.GK
  E#t      E#t  :K#E: E#t   t#K: t#E E#jL#D:  ;#L  DWW.
  E#t      E#KDDDD###iE#t    ;#W,t#E E#t ,K#j  t#f j#L
  E#t      E#f,t#Wi,,,E#t     :K#D#E E#t   jD   f#D#j#.
  E#t      E#t  ;#W:  E#t      .E##E j#t         G#t .
  E#t      DWi   ,KK: ..         G#E  ,;          t
  ;#t                             fE
  :;                              ,
  `
                        }
                    </pre>
                </div >
            </div>
        )
    }
}
