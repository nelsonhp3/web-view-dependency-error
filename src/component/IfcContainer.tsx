import { forwardRef } from 'react'
import { IfcViewerAPI } from 'web-ifc-viewer'

interface IfcContainerProps {
    viewer?: IfcViewerAPI
}

const IfcContainer = forwardRef<HTMLDivElement, IfcContainerProps>((props, ref) => {

    return (
        <div className={'mainContainer'}>
            <div className={'ifcContainer'}
                ref={ref}
            />
        </div>
    )
})

export default IfcContainer