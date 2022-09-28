package uz.tashkec.service.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.tashkec.domain.CenterStructure;
import uz.tashkec.repository.CenterStructureRepository;
import uz.tashkec.service.CenterStructureService;
import uz.tashkec.service.dto.CenterStructureDTO;
import uz.tashkec.service.mapper.CenterStructureMapper;

/**
 * Service Implementation for managing {@link CenterStructure}.
 */
@Service
@Transactional
public class CenterStructureServiceImpl implements CenterStructureService {

    private final Logger log = LoggerFactory.getLogger(CenterStructureServiceImpl.class);

    private final CenterStructureRepository centerStructureRepository;

    private final CenterStructureMapper centerStructureMapper;

    public CenterStructureServiceImpl(CenterStructureRepository centerStructureRepository, CenterStructureMapper centerStructureMapper) {
        this.centerStructureRepository = centerStructureRepository;
        this.centerStructureMapper = centerStructureMapper;
    }

    @Override
    public CenterStructureDTO save(CenterStructureDTO centerStructureDTO) {
        log.debug("Request to save CenterStructure : {}", centerStructureDTO);
        CenterStructure centerStructure = centerStructureMapper.toEntity(centerStructureDTO);
        centerStructure = centerStructureRepository.save(centerStructure);
        return centerStructureMapper.toDto(centerStructure);
    }

    @Override
    public CenterStructureDTO update(CenterStructureDTO centerStructureDTO) {
        log.debug("Request to update CenterStructure : {}", centerStructureDTO);
        CenterStructure centerStructure = centerStructureMapper.toEntity(centerStructureDTO);
        centerStructure = centerStructureRepository.save(centerStructure);
        return centerStructureMapper.toDto(centerStructure);
    }

    @Override
    public Optional<CenterStructureDTO> partialUpdate(CenterStructureDTO centerStructureDTO) {
        log.debug("Request to partially update CenterStructure : {}", centerStructureDTO);

        return centerStructureRepository
            .findById(centerStructureDTO.getId())
            .map(existingCenterStructure -> {
                centerStructureMapper.partialUpdate(existingCenterStructure, centerStructureDTO);

                return existingCenterStructure;
            })
            .map(centerStructureRepository::save)
            .map(centerStructureMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CenterStructureDTO> findAll() {
        log.debug("Request to get all CenterStructures");
        return centerStructureRepository
            .findAll()
            .stream()
            .map(centerStructureMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CenterStructureDTO> findOne(Long id) {
        log.debug("Request to get CenterStructure : {}", id);
        return centerStructureRepository.findById(id).map(centerStructureMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete CenterStructure : {}", id);
        centerStructureRepository.deleteById(id);
    }
}
