import { useEffect, createRef, useState } from 'react'

import IfcContainer from '../component/IfcContainer'
import { Color, Matrix4 } from 'three'
import { IfcViewerAPI } from 'web-ifc-viewer'

const Main = () => {
  const ifcContainer = createRef<HTMLDivElement>()
  const [viewer, setViewer] = useState<IfcViewerAPI>()

  useEffect(() => {
    if (ifcContainer.current) {
      const container = ifcContainer.current
      const ifcViewer = new IfcViewerAPI({ container, backgroundColor: new Color(0x333333) })
      ifcViewer.IFC.loader.ifcManager.applyWebIfcConfig({
        COORDINATE_TO_ORIGIN: true,
        USE_FAST_BOOLS: false
      })

      loadIFCs(ifcViewer)

      setViewer(ifcViewer)
      console.log('IfcContainer', IfcContainer)
    }
  }, [])

  const loadIFCs = async (ifcViewer: IfcViewerAPI) => {
    await ifcViewer.IFC.loadIfcUrl('1PAV.ifc', true).then(async (model) => {
      const matrixArr = await ifcViewer.IFC.loader.ifcManager.ifcAPI.GetCoordinationMatrix(model ? model.modelID : 0)
      const matrix = new Matrix4().fromArray(matrixArr)
      ifcViewer.IFC.loader.ifcManager.setupCoordinationMatrix(matrix)

      await ifcViewer.IFC.loader.ifcManager.applyWebIfcConfig({
        COORDINATE_TO_ORIGIN: false,
        USE_FAST_BOOLS: true
      })
    })

    await ifcViewer.IFC.loadIfcUrl('2PAV.ifc', false)
  }

  return (
    <div>
      <IfcContainer
        ref={ifcContainer}
        viewer={viewer} />
    </div>
  )
}

export { Main }